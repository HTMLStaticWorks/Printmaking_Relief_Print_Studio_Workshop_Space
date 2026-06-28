import os
import re

directory = r'd:\June Websites\Printmaking & Relief Print Studio (Workshop Space)'

for filename in os.listdir(directory):
    if filename.endswith('.html'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        if '<nav class="navbar">' not in content:
            continue

        # Add Gallery and Workshops if not already present
        if 'gallery.html' not in content:
            content = re.sub(
                r'(<a href="services\.html" class="nav-link.*?">Services</a>)',
                r'\1\n                <a href="gallery.html" class="nav-link">Gallery</a>\n                <a href="workshop.html" class="nav-link">Workshops</a>',
                content
            )

        # Replace login nav-link with CTA button inside nav-actions
        if '<a href="login.html" class="nav-link">Login</a>' in content:
            content = content.replace(
                '                <a href="login.html" class="nav-link">Login</a>\n            </div>\n            <button class="mobile-toggle" aria-label="Toggle Navigation">☰</button>',
                '            </div>\n            <div class="nav-actions">\n                <a href="login.html" class="btn btn-primary" style="padding: 0.4rem 1.5rem; font-size: 0.95rem;">Login</a>\n                <button class="mobile-toggle" aria-label="Toggle Navigation">☰</button>\n            </div>'
            )
            # Also handle if they have carriage returns
            content = content.replace(
                '                <a href="login.html" class="nav-link">Login</a>\r\n            </div>\r\n            <button class="mobile-toggle" aria-label="Toggle Navigation">☰</button>',
                '            </div>\r\n            <div class="nav-actions">\r\n                <a href="login.html" class="btn btn-primary" style="padding: 0.4rem 1.5rem; font-size: 0.95rem;">Login</a>\r\n                <button class="mobile-toggle" aria-label="Toggle Navigation">☰</button>\r\n            </div>'
            )

        # Fix active states for gallery and workshop if we are on those pages
        if filename == 'gallery.html':
            content = content.replace('<a href="gallery.html" class="nav-link">', '<a href="gallery.html" class="nav-link active">')
        elif filename == 'workshop.html':
            content = content.replace('<a href="workshop.html" class="nav-link">', '<a href="workshop.html" class="nav-link active">')

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {filename}')
