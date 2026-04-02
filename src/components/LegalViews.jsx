import React from 'react';
import { Rocket, Mail, ExternalLink, Github, MessageSquare, ShieldCheck, Download, Star, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicy = ({ setShowPrivacy }) => (
  <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in duration-500">
    <div className="max-w-4xl mx-auto px-6 py-20 relative">
      <button
        onClick={() => { setShowPrivacy(false); window.scrollTo(0, 0); }}
        className="fixed top-8 left-8 p-3 rounded-full bg-slate-100 hover:bg-orange-100 hover:text-orange-600 transition-all z-50 flex items-center gap-2 group"
      >
        <Rocket className="rotate-[270deg] group-hover:scale-110 transition-transform" size={20} />
        <span className="font-bold text-sm pr-2">Back to Home</span>
      </button>

      <div className="text-center mb-16">
        <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold mb-4 uppercase tracking-widest">Privacy Central</div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">Privacy <span className="text-orange-600">Policy</span></h1>
        <p className="text-slate-500 font-medium">Last Updated: March 29, 2026</p>
      </div>

      <div className="space-y-12">
        <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 mb-4 italic">1. Our Commitment</h2>
          <p className="text-slate-600 leading-relaxed font-medium">
            AIO-YTDER is built as a privacy-first utility. We believe your downloads and browsing history are your business alone. The application is engineered to operate without collecting any personally identifiable information (PII).
          </p>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200">
          <h2 className="text-2xl font-black text-slate-900 mb-4 italic">2. Data Collection</h2>
          <ul className="space-y-4 text-slate-600 font-medium">
            <li className="flex gap-3"><span className="text-orange-500 font-bold">•</span> <b>No User Accounts:</b> We do not require any registration or account creation.</li>
            <li className="flex gap-3"><span className="text-orange-500 font-bold">•</span> <b>No Tracking:</b> We do not track your location, contacts, or device identifiers.</li>
            <li className="flex gap-3"><span className="text-orange-500 font-bold">•</span> <b>No Logs:</b> Your download history is stored locally on your device and is never uploaded to our servers.</li>
          </ul>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-orange-50/30 border border-orange-100">
          <h2 className="text-2xl font-black text-slate-900 mb-4 italic">3. Permissions</h2>
          <p className="text-slate-600 leading-relaxed font-medium mb-4">
            The app requests only the minimum permissions required to function:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
              <div className="font-black text-orange-600 text-xs mb-1">STORAGE</div>
              <div className="text-sm text-slate-500">To save the downloaded videos and audios to your gallery.</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
              <div className="font-black text-orange-600 text-xs mb-1">INTERNET</div>
              <div className="text-sm text-slate-500">To access the websites you wish to download from.</div>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 mb-4 italic">4. Third-Party Analytics</h2>
          <p className="text-slate-600 leading-relaxed font-medium">
            To improve the app's stability, we may use standard tools like Firebase Crashlytics. These tools only collect anonymous crash reports and technical device data (model, OS version) to help us fix bugs. They cannot identify you.
          </p>
        </div>

        <div className="text-center pt-12">
          <p className="text-slate-400 text-sm font-medium">Have questions? Contact us at the official GitHub repository.</p>
          <button
            onClick={() => { setShowPrivacy(false); window.scrollTo(0, 0); }}
            className="mt-8 px-10 py-4 bg-slate-900 text-white rounded-full font-black hover:bg-orange-600 transition-all active:scale-95"
          >
            Close & Continue
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const ContactUs = ({ setShowContact }) => (
  <div className="fixed inset-0 z-[110] bg-white overflow-y-auto animate-in fade-in duration-500">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/30 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/20 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none"></div>

    <div className="max-w-4xl mx-auto px-6 py-20 relative">
      <button
        onClick={() => { setShowContact(false); window.scrollTo(0, 0); }}
        className="fixed top-8 left-8 p-3 rounded-full bg-slate-100 hover:bg-orange-100 hover:text-orange-600 transition-all z-50 flex items-center gap-2 group shadow-sm"
      >
        <Rocket className="rotate-[270deg] group-hover:scale-110 transition-transform" size={20} />
        <span className="font-bold text-sm pr-2">Back to Home</span>
      </button>

      <div className="text-center mb-16">
        <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold mb-4 uppercase tracking-widest">Support Portal</div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">Get in <span className="text-orange-600">Touch</span></h1>
        <p className="text-slate-500 font-medium text-lg">We're here to help you get the most out of AIO-YTDER.</p>
      </div>

      <div className="grid gap-8">
        <div className="p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-2xl shadow-slate-200/50 flex flex-col items-center text-center group hover:border-orange-200 transition-colors">
          <div className="w-20 h-20 rounded-[2rem] bg-orange-500 text-white flex items-center justify-center mb-8 shadow-[0_15px_30px_rgba(249,115,22,0.3)] group-hover:scale-110 transition-all duration-500">
            <Mail size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Official Email Support</h2>
          <p className="text-slate-500 font-medium mb-8">Response time: Within 24-48 Business Hours</p>
          <a
            href="mailto:contact@ytder.com"
            className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200 flex items-center gap-3"
          >
            contact@ytder.com
            <ExternalLink size={18} className="opacity-50" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200 hover:border-blue-200 transition-colors flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Github size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">GitHub Repository</h3>
            <p className="text-slate-500 text-sm mb-6 px-4">Report bugs directly or browse the source code.</p>
            <a
              href="https://github.com/shibaFoss/AIO-Video-Downloader"
              target="_blank" rel="noopener noreferrer"
              className="font-black text-blue-600 text-sm hover:underline flex items-center gap-2"
            >
              View Repository <ExternalLink size={14} />
            </a>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200 hover:border-emerald-200 transition-colors flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Chat with Us</h3>
            <p className="text-slate-500 text-sm mb-6 px-4">For immediate help, join our developer community.</p>
            <button className="font-black text-emerald-600 text-sm hover:underline flex items-center gap-2">
              Coming Soon <ExternalLink size={14} className="opacity-50" />
            </button>
          </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-orange-50/50 border border-orange-100 text-center">
          <p className="text-slate-500 text-sm font-medium">Please include your <b>Device Model</b> and <b>Android Version</b> when reporting a bug for faster resolution.</p>
          <button
            onClick={() => { setShowContact(false); window.scrollTo(0, 0); }}
            className="mt-8 px-12 py-4 bg-slate-900 text-white rounded-full font-black hover:bg-orange-600 transition-all active:scale-95"
          >
            Close Support
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const TermsOfService = ({ setShowTerms }) => (
  <div className="fixed inset-0 z-[120] bg-white overflow-y-auto animate-in slider-in-bottom duration-500">
    <div className="max-w-4xl mx-auto px-6 py-20 relative">
       <button
        onClick={() => { setShowTerms(false); window.scrollTo(0, 0); }}
        className="fixed top-8 left-8 p-3 rounded-full bg-slate-100 hover:bg-orange-100 hover:text-orange-600 transition-all z-50 flex items-center gap-2 group"
      >
        <Rocket className="rotate-[270deg] group-hover:scale-110 transition-transform" size={20} />
        <span className="font-bold text-sm pr-2">Back to Home</span>
      </button>

      <div className="text-center mb-16">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mb-4 uppercase tracking-widest">Legal Framework</div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">Terms of <span className="text-blue-600">Service</span></h1>
        <p className="text-slate-500 font-medium">Agreement Version 1.2 • March 2026</p>
      </div>

      <div className="prose prose-slate max-w-none space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 mb-4 italic">1. Acceptance of Terms</h2>
          <p className="text-slate-600 leading-relaxed font-medium">
            By downloading or using AIO-YTDER, you agree to be bound by these terms. This application is a utility tool designed for personal, non-commercial use only.
          </p>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200">
          <h2 className="text-2xl font-black text-slate-900 mb-4 italic">2. Intellectual Property</h2>
          <p className="text-slate-600 leading-relaxed font-medium">
            Users are strictly responsible for respecting the intellectual property rights of content creators. AIO-YTDER does not host any content and acts only as a technical bridge between users and publicly available web resources.
          </p>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-orange-50/30 border border-orange-100">
          <h2 className="text-2xl font-black text-slate-900 mb-4 italic">3. Disclaimer of Liability</h2>
          <p className="text-slate-600 leading-relaxed font-medium">
            AIO-YTDER is provided "as is" without warranty of any kind. Developers are not liable for any misuse of the application or violation of third-party terms of service by the users.
          </p>
        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => { setShowTerms(false); window.scrollTo(0, 0); }}
            className="px-12 py-4 bg-slate-900 text-white rounded-full font-black hover:bg-blue-600 transition-all active:scale-95"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  </div>
);
