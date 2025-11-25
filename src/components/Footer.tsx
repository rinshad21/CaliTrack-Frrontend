import { Github, Twitter, Mail, Heart, ExternalLink } from "lucide-react";
function Footer() {
  const currentYear = new Date().getFullYear();



  return (
    <footer className="relative bg-white dark:bg-linear-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700 theme-transition">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-amber-400/5 to-transparent dark:via-amber-400/5 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                CaliTrack
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Your personal fitness companion for tracking workouts and
              progress.
            </p>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              Open Source
            </h4>
            <a
              href="https://github.com/rinshad21/CaliTrack-Frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-4 py-3 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300 hover:shadow-lg"
            >
              <Github className="w-5 h-5 text-slate-900 dark:text-white group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  View on GitHub
                </p>
                <a className="text-xs text-slate-600 dark:text-slate-400">
                  Star my project on GitHub
                </a>
              </div>
            </a>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-600 to-transparent mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left">
            © {currentYear} FitTracker. Made by Rinshad All rights reserved.
            Built with <Heart className="w-3 h-3 inline text-red-500 mx-1" />
            for home workout enthusiasts.
          </p>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-amber-400/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      </div>
    </footer>
  );
}

export default Footer;
