const fs = require('fs');

let content = fs.readFileSync('src/Portfolio.js', 'utf8');

// Welcome screen
content = content.replace(/bg-slate-950 text-white/g, 'bg-page text-ink');

// Strong tags
content = content.replace(/<strong className="text-white">/g, '<strong className="text-ink">');

// Headings
content = content.replace(/text-white/g, function(match, offset, string) {
    // We only replace text-white if it's NOT inside a button or a specific dark element.
    // Let's do selective replacement based on preceding/succeeding text.
    
    // Instead of regex matching the entire file with complex lookarounds, 
    // we'll replace known patterns.
    return match;
});

// Let's use simple string replacements for the headings:
content = content.replace(/text-2xl font-bold mb-6 text-white/g, 'text-2xl font-bold mb-6 text-ink');
content = content.replace(/text-xl font-bold text-white/g, 'text-xl font-bold text-ink');
content = content.replace(/text-lg font-bold text-white/g, 'text-lg font-bold text-ink');
content = content.replace(/text-3xl md:text-4xl font-bold text-white/g, 'text-3xl md:text-4xl font-bold text-ink');
content = content.replace(/text-5xl font-black text-white/g, 'text-5xl font-black text-ink');

// Other specific elements
content = content.replace(/text-sm font-bold text-white/g, 'text-sm font-bold text-ink');
content = content.replace(/hover:text-white/g, 'hover:text-ink');
content = content.replace(/text-white group-hover:text-accent/g, 'text-ink group-hover:text-accent');

// Resume link
content = content.replace(/gap-2 text-white/g, 'gap-2 text-ink');

// The project tags background is transparent, so text-ink will be visible.
// The project period tag:
content = content.replace(/text-xs font-bold text-white/g, 'text-xs font-bold text-ink');

// The icon inside the CB logo at the top:
// "bg-gradient-to-br from-teal-400 to-indigo-500 ... text-white" 
// We want this to STAY text-white. 

// The timeline circles:
// bg-accent-strong text-white -> should stay text-white, because accent-strong is dark.
// bg-slate-700 text-white -> bg-slate-700 is dark, but wait, maybe it should be text-white in light mode too, or maybe we change bg-slate-700 to something else? 
// The timeline dot: `bg-slate-700 text-white` in light mode is dark background, white text. That's fine! 

fs.writeFileSync('src/Portfolio.js', content);
console.log('Fixed text-white');
