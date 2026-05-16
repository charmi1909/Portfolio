const fs = require('fs');

let content = fs.readFileSync('src/Portfolio.js', 'utf8');

// Replace Lucide imports to include Sun and Moon
content = content.replace(
  /Smartphone, FileCheck\n} from "lucide-react";/,
  'Smartphone, FileCheck,\n  Sun, Moon\n} from "lucide-react";'
);

// Add theme state and toggle
const stateHook = `  const [activeSkillTab, setActiveSkillTab] = useState("fullstack");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");`;
content = content.replace(/  const \[activeSkillTab, setActiveSkillTab\] = useState\("fullstack"\);/, stateHook);

const navRightHtml = `<div className="hidden md:block">
              <a href="/Bhalodiya_Charmi_Resume.pdf"`;
const navRightHtmlReplacement = `<div className="hidden md:flex items-center gap-4">
              <button 
                onClick={toggleTheme} 
                className="p-3 rounded-full bg-glass border border-glass-border hover:bg-glass hover:text-accent transition-all text-ink"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a href="/Bhalodiya_Charmi_Resume.pdf"`;
content = content.replace(navRightHtml, navRightHtmlReplacement);

const mobileMenuHtml = `<button className="md:hidden text-slate-300 p-2 rounded-full bg-white/5 border border-white/10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>`;
const mobileMenuHtmlReplacement = `<div className="flex items-center gap-4 md:hidden">
              <button onClick={toggleTheme} className="text-ink p-2 rounded-full bg-glass border border-glass-border">
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="text-ink p-2 rounded-full bg-glass border border-glass-border" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>`;
content = content.replace(mobileMenuHtml, mobileMenuHtmlReplacement);

// We need to replace the colors globally
// Be careful with text-white, as some of it should remain white. 
// We will map:
// bg-[#020617] -> bg-page
// bg-[#020617]/80 -> bg-nav
// bg-[#020617]/95 -> bg-nav
// text-slate-200 -> text-ink
// text-slate-300 -> text-subtle
// text-slate-400 -> text-muted
// text-slate-500 -> text-muted
// text-slate-950 -> text-on-accent
// bg-white/5 -> bg-glass
// bg-white/10 -> bg-glass
// border-white/10 -> border-glass-border
// border-white/5 -> border-glass-border
// border-white/20 -> border-glass-border
// border-white/30 -> border-glass-border
// text-teal-400 -> text-accent
// bg-teal-500 -> bg-accent-strong
// bg-teal-400 -> bg-accent

content = content.replace(/bg-\[\#020617\]\/80/g, 'bg-nav');
content = content.replace(/bg-\[\#020617\]\/95/g, 'bg-nav');
content = content.replace(/bg-\[\#020617\]/g, 'bg-page');

content = content.replace(/text-slate-200/g, 'text-ink');
content = content.replace(/text-slate-300/g, 'text-subtle');
content = content.replace(/text-slate-400/g, 'text-muted');
content = content.replace(/text-slate-500/g, 'text-muted');
content = content.replace(/text-slate-950/g, 'text-on-accent');

content = content.replace(/bg-white\/5/g, 'bg-glass');
content = content.replace(/bg-white\/10/g, 'bg-glass');
content = content.replace(/border-white\/10/g, 'border-glass-border');
content = content.replace(/border-white\/5/g, 'border-glass-border');
content = content.replace(/border-white\/20/g, 'border-glass-border');

content = content.replace(/text-teal-400/g, 'text-accent');
content = content.replace(/bg-teal-500/g, 'bg-accent-strong');
content = content.replace(/bg-teal-400/g, 'bg-accent');
content = content.replace(/text-teal-500/g, 'text-accent-strong');

fs.writeFileSync('src/Portfolio.js', content);
console.log("Replacements complete.");
