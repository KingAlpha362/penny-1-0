
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      {/* Header Skeleton */}
      <header className="flex items-center justify-between p-6 bg-background border-b">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </header>

      <main className="flex-1 space-y-6 p-6">
        {/* Overview Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-4 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-4 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-4 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/2" />
            </CardContent>
          </Card>
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <Skeleton className="h-6 w-1/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>
          <Card className="lg:col-span-1">
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-2/4" />
                <Skeleton className="h-5 w-1/4" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-2/4" />
                <Skeleton className="h-5 w-1/4" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-1/4" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-2/4" />
                <Skeleton className="h-5 w-1/4" />
              </div>
               <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-1/4" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
