
import { PennywiseLogo } from "@/components/icons/pennywise-logo";
import { Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
  </svg>
);

const CaretDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
    </svg>
);


export default function PricingPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f8fbfc] group/design-root overflow-x-hidden" style={{fontFamily: 'Manrope, "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7f0f3] px-10 py-3">
          <Link href="/" className="flex items-center gap-4 text-[#0d181b]">
            <PennywiseLogo className="w-6 h-6 text-primary" />
            <h2 className="text-[#0d181b] text-lg font-bold leading-tight tracking-[-0.015em]">PennyWise</h2>
          </Link>
          <div className="flex flex-1 justify-end gap-8">
            <div className="hidden md:flex items-center gap-9">
              <Link className="text-[#0d181b] text-sm font-medium leading-normal" href="#">Overview</Link>
              <Link className="text-[#0d181b] text-sm font-medium leading-normal" href="#">Features</Link>
              <Link className="text-[#0d181b] text-sm font-medium leading-normal" href="/pricing">Pricing</Link>
              <Link className="text-[#0d181b] text-sm font-medium leading-normal" href="#">Support</Link>
            </div>
             <Button asChild className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#13b6ec] text-white text-sm font-bold leading-normal tracking-[0.015em]">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </header>
        <main className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#0d181b] tracking-light text-[32px] font-bold leading-tight min-w-72">Choose the plan that's right for you</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(228px,1fr))] gap-2.5 px-4 py-3">
              <div className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[#cfe1e7] bg-white p-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[#0d181b] text-base font-bold leading-tight">Basic</h3>
                  <p className="flex items-baseline gap-1 text-[#0d181b]">
                    <span className="text-[#0d181b] text-4xl font-black leading-tight tracking-[-0.033em]">Free</span>
                    <span className="text-[#0d181b] text-base font-bold leading-tight">/month</span>
                  </p>
                </div>
                <Button variant="outline" className="w-full bg-[#e7f0f3] border-transparent hover:bg-gray-300/80 text-[#0d181b]">Get Started</Button>
                <div className="flex flex-col gap-2">
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d181b] items-center">
                    <CheckIcon />
                    Expense Tracking
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d181b] items-center">
                    <CheckIcon />
                    Budgeting Tools
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d181b] items-center">
                    <CheckIcon />
                    Basic Reporting
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-xl border-2 border-solid border-[#13b6ec] bg-white p-6 relative">
                 <div className="absolute -top-4 right-6">
                    <p className="text-white text-xs font-medium leading-normal tracking-[0.015em] rounded-full bg-[#13b6ec] px-3 py-1 text-center">Recommended</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[#0d181b] text-base font-bold leading-tight">Premium</h3>
                  <p className="flex items-baseline gap-1 text-[#0d181b]">
                    <span className="text-[#0d181b] text-4xl font-black leading-tight tracking-[-0.033em]">$9.99</span>
                    <span className="text-[#0d181b] text-base font-bold leading-tight">/month</span>
                  </p>
                </div>
                <Button className="w-full bg-[#13b6ec] text-white hover:bg-[#13b6ec]/90">Get Started</Button>
                <div className="flex flex-col gap-2">
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d181b] items-center">
                    <CheckIcon />
                    All Basic Features
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d181b] items-center">
                    <CheckIcon />
                    Advanced Reporting
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d181b] items-center">
                    <CheckIcon />
                    Customizable Alerts
                  </div>
                   <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d181b] items-center">
                    <CheckIcon />
                    Priority Support
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[#cfe1e7] bg-white p-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[#0d181b] text-base font-bold leading-tight">Family</h3>
                  <p className="flex items-baseline gap-1 text-[#0d181b]">
                    <span className="text-[#0d181b] text-4xl font-black leading-tight tracking-[-0.033em]">$14.99</span>
                    <span className="text-[#0d181b] text-base font-bold leading-tight">/month</span>
                  </p>
                </div>
                <Button variant="outline" className="w-full bg-[#e7f0f3] border-transparent hover:bg-gray-300/80 text-[#0d181b]">Get Started</Button>
                <div className="flex flex-col gap-2">
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d181b] items-center">
                    <CheckIcon />
                    All Premium Features
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d181b] items-center">
                    <CheckIcon />
                    Up to 5 Family Members
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d181b] items-center">
                    <CheckIcon />
                    Shared Budgeting
                  </div>
                   <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d181b] items-center">
                    <CheckIcon />
                    Family Financial Insights
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-[#0d181b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Frequently Asked Questions</h2>
            <div className="flex flex-col p-4 gap-3">
              <details className="flex flex-col rounded-xl border border-[#cfe1e7] bg-white px-[15px] py-[7px] group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
                  <p className="text-[#0d181b] text-sm font-medium leading-normal">What payment methods do you accept?</p>
                  <div className="text-[#0d181b] group-open:rotate-180 transition-transform">
                    <CaretDownIcon />
                  </div>
                </summary>
                <p className="text-[#4c869a] text-sm font-normal leading-normal pb-2 pt-2">We accept all major credit cards, including Visa, Mastercard, and American Express, as well as payments through PayPal.</p>
              </details>
              <details className="flex flex-col rounded-xl border border-[#cfe1e7] bg-white px-[15px] py-[7px] group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
                  <p className="text-[#0d181b] text-sm font-medium leading-normal">Can I cancel my subscription at any time?</p>
                  <div className="text-[#0d181b] group-open:rotate-180 transition-transform">
                    <CaretDownIcon />
                  </div>
                </summary>
                <p className="text-[#4c869a] text-sm font-normal leading-normal pb-2 pt-2">Yes, you can cancel your subscription at any time. Your access to premium features will continue until the end of the current billing period.</p>
              </details>
              <details className="flex flex-col rounded-xl border border-[#cfe1e7] bg-white px-[15px] py-[7px] group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
                  <p className="text-[#0d181b] text-sm font-medium leading-normal">Is there a free trial available?</p>
                  <div className="text-[#0d181b] group-open:rotate-180 transition-transform">
                     <CaretDownIcon />
                  </div>
                </summary>
                 <p className="text-[#4c869a] text-sm font-normal leading-normal pb-2 pt-2">We do not offer a free trial, but our Basic plan is free to use forever and includes essential features to get you started.</p>
              </details>
            </div>
             <div className="flex justify-center">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
                <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#13b6ec] text-white text-sm font-bold leading-normal tracking-[0.015em] grow hover:bg-[#13b6ec]/90">
                  <span className="truncate">Get Started</span>
                </Button>
                <Button variant="outline" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7f0f3] text-[#0d181b] text-sm font-bold leading-normal tracking-[0.015em] grow border-transparent hover:bg-gray-300/80">
                  <span className="truncate">Contact Sales</span>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <div className="flex flex-col gap-6 px-5 py-10 text-center">
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a className="text-[#4c869a] text-base font-normal leading-normal min-w-40" href="#">Terms of Service</a>
                <a className="text-[#4c869a] text-base font-normal leading-normal min-w-40" href="#">Privacy Policy</a>
                <a className="text-[#4c869a] text-base font-normal leading-normal min-w-40" href="#">Contact Us</a>
              </div>
              <p className="text-[#4c869a] text-base font-normal leading-normal">© 2024 PennyWise. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

    