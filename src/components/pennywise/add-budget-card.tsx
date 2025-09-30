
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AddBudgetCardProps {
    onClick: () => void;
}

export function AddBudgetCard({ onClick }: AddBudgetCardProps) {
  return (
    <Card className="flex items-center justify-center h-full border-dashed">
      <CardContent className="p-6">
        <Button 
            variant="ghost" 
            className="flex flex-col items-center justify-center gap-2 h-auto text-muted-foreground hover:text-primary"
            onClick={onClick}
        >
          <PlusCircle className="w-8 h-8" />
          <span className="font-bold">Add New Budget</span>
        </Button>
      </CardContent>
    </Card>
  );
}
