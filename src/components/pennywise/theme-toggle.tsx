
"use client"

import * as React from "react"
import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const themes = [
    { name: 'Green', class: 'theme-green' },
    { name: 'Zinc', class: 'theme-zinc' },
    { name: 'Rose', class: 'theme-rose' },
    { name: 'Blue', class: 'theme-blue' },
    { name: 'Orange', class: 'theme-orange' },
];

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const currentTheme = themes.find(t => t.class === theme?.replace(' dark', ''))?.class || 'theme-green';
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setTheme(currentTheme);
    } else {
      document.documentElement.classList.add('dark');
      setTheme(`${currentTheme} dark`);
    }
  }

  const handleThemeChange = (newTheme: string) => {
    const isDark = document.documentElement.classList.contains('dark');
    if(isDark) {
        setTheme(`${newTheme} dark`);
    } else {
        setTheme(newTheme);
    }
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => toggleDarkMode()}>
          Toggle Light/Dark Mode
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Palette className="mr-2 h-4 w-4" />
            <span>Theme</span>
        </DropdownMenuItem>
        {themes.map((themeItem) => (
            <DropdownMenuItem
                key={themeItem.name}
                onClick={() => handleThemeChange(themeItem.class)}
            >
                {themeItem.name}
            </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
