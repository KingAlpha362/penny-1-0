
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { CreateBudgetForm } from './create-budget-form';
import type { Budget } from '@/app/(app)/budgets/page';

interface CreateBudgetDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCreateBudget: (budget: Omit<Budget, 'id' | 'userId'>) => void;
}

export function CreateBudgetDialog({
  isOpen,
  onOpenChange,
  onCreateBudget,
}: CreateBudgetDialogProps) {
  
  const handleSubmit = (budget: Omit<Budget, 'id' | 'userId'>) => {
    onCreateBudget(budget);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Budget</DialogTitle>
          <DialogDescription>
            Set a spending limit for a specific category.
          </DialogDescription>
        </DialogHeader>
        <CreateBudgetForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
