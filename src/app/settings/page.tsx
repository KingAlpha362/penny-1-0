
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock, Bell, Link as LinkIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col flex-1">
      <header className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Settings</h2>
          <p className="text-muted-foreground mt-1">
            Manage your account and preferences.
          </p>
        </div>
      </header>
      <main className="flex-1 p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">
                <User className="mr-2 h-4 w-4" />
                Profile
            </TabsTrigger>
            <TabsTrigger value="security">
                <Lock className="mr-2 h-4 w-4" />
                Security
            </TabsTrigger>
            <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
            </TabsTrigger>
            <TabsTrigger value="integrations">
                <LinkIcon className="mr-2 h-4 w-4" />
                Integrations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://picsum.photos/seed/1/100/100" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <Button>Change Avatar</Button>
                    <Button variant="ghost" className="text-destructive">Remove Avatar</Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" defaultValue="Jane Doe" />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="jane.doe@email.com" readOnly />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
             <Card className="mt-6">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>For your security, we recommend using a strong password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button>Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what you want to be notified about.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                        <Label htmlFor="weekly-summary" className="font-medium">Weekly Summary</Label>
                        <p className="text-sm text-muted-foreground">Get a summary of your financial activity every week.</p>
                    </div>
                    <Switch id="weekly-summary" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                     <div>
                        <Label htmlFor="goal-milestones" className="font-medium">Goal Milestones</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications when you reach a saving goal.</p>
                    </div>
                  <Switch id="goal-milestones" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                        <Label htmlFor="large-transactions" className="font-medium">Large Transactions</Label>
                        <p className="text-sm text-muted-foreground">Get alerts for any transaction over a set amount.</p>
                    </div>
                  <Switch id="large-transactions" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

           <TabsContent value="integrations">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                 <CardDescription>Connect with other services to streamline your finances.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                       <LinkIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Plaid</p>
                      <p className="text-sm text-muted-foreground">Connected</p>
                    </div>
                  </div>
                  <Button variant="outline">Manage</Button>
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#E31837]"><path d="M4 12h16"/><path d="M7 7l5 10 5-10"/></svg>
                    </div>
                    <div>
                      <p className="font-medium">Bank of America</p>
                      <p className="text-sm text-muted-foreground">Not Connected</p>
                    </div>
                  </div>
                  <Button>Connect</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}
