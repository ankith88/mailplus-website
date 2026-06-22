import re

page_path = "src/app/post-office-collect-lodge/page.tsx"

with open(page_path, "r", encoding="utf-8") as f:
    page_content = f.read()

# Fix <br> tags
page_content = re.sub(r'<br>', r'<br />', page_content)

with open(page_path, "w", encoding="utf-8") as f:
    f.write(page_content)

print("Fixed <br> tags!")

