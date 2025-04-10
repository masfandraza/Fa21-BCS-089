import json

# Load HAR file
har_file_path = "www.tedbaker.com.har"

with open(har_file_path, "r", encoding="utf-8") as file:
    har_data = json.load(file)

# Extract image URLs
image_urls = []
for entry in har_data["log"]["entries"]:
    try:
        url = entry["request"]["url"]
        mime_type = entry["response"]["content"]["mimeType"] if "content" in entry["response"] else ""

        # Check if URL ends with an image format or has an image MIME type
        if url.endswith((".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg")) or "image" in mime_type:
            if url.startswith("//"):
                url = "https:" + url  # Fix missing scheme
            image_urls.append(url)
    except KeyError:
        continue  # Skip if missing response data

# Save extracted URLs to a file (optional)
with open("image_urls.txt", "w") as file:
    for img_url in image_urls:
        file.write(img_url + "\n")

# Print extracted URLs
print(f"✅ Extracted {len(image_urls)} image URLs.")
for img_url in image_urls[:10]:  # Show first 10 for preview
    print(img_url)
