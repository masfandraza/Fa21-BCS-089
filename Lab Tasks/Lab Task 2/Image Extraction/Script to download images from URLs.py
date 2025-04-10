import requests
import os
import urllib.parse

# Load extracted image URLs
image_urls = []
with open("image_urls.txt", "r") as file:
    image_urls = file.read().splitlines()

# Create a folder for downloaded images
os.makedirs("downloaded_images", exist_ok=True)

# Function to clean filenames
def clean_filename(url):
    filename = url.split("/")[-1]  # Get the last part of the URL
    filename = filename.split("?")[0]  # Remove query parameters
    filename = urllib.parse.unquote(filename)  # Decode URL encoding
    return filename

# Download images
for img_url in image_urls:
    try:
        response = requests.get(img_url, stream=True)
        if response.status_code == 200:
            filename = clean_filename(img_url)  # Clean the filename
            filepath = os.path.join("downloaded_images", filename)
            with open(filepath, "wb") as file:
                for chunk in response.iter_content(1024):
                    file.write(chunk)
            print(f"✅ Downloaded: {filename}")
        else:
            print(f"⚠️ Failed: {img_url} (Status Code: {response.status_code})")
    except Exception as e:
        print(f"❌ Error downloading {img_url}: {e}")

print("\n✅ All valid images downloaded successfully!")
