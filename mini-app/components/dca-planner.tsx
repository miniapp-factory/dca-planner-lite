"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

interface Plan {
  token: string;
  amount: number;
  periods: number;
  total: number;
}

export default function DcaPlanner() {
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [periods, setPeriods] = useState("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState("");

  const addPlan = () => {
    const amt = parseFloat(amount);
    const per = parseInt(periods, 10);
    if (!token || isNaN(amt) || isNaN(per) || amt <= 0 || per <= 0) {
      setError("Please fill in all fields with valid numbers.");
      return;
    }
    const total = amt * per;
    setPlans([...plans, { token, amount: amt, periods: per, total }]);
    setToken("");
    setAmount("");
    setPeriods("");
    setError("");
  };

  const deletePlan = (index: number) => {
    setPlans(plans.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setPlans([]);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <h2 className="text-xl font-semibold">DCA Planner Lite</h2>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="token">Token Name</Label>
          <Input
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="e.g., BTC"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="amount">Investment Amount per Period</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 100"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="periods">Number of Periods</Label>
          <Input
            id="periods"
            type="number"
            value={periods}
            onChange={(e) => setPeriods(e.target.value)}
            placeholder="e.g., 12"
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <Button onClick={addPlan}>Add Plan</Button>
      </CardContent>
      {plans.length > 0 && (
        <CardFooter className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Your DCA Plans</h3>
          <ul className="space-y-2">
            {plans.map((p, idx) => (
              <li key={idx} className="flex justify-between items-center p-2 border rounded">
                <div>
                  <p><strong>{p.token}</strong></p>
                  <p>Amount per Period: {p.amount}</p>
                  <p>Periods: {p.periods}</p>
                  <p>Total Investment: {p.total}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => deletePlan(idx)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
          <Button variant="destructive" onClick={clearAll}>
            Clear All
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
