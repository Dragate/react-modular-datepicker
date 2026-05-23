from playwright.sync_api import sync_playwright
import os
import shutil

def record_video(url, name):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        video_dir = f"/tmp/videos_{name}"
        os.makedirs(video_dir, exist_ok=True)
        context = browser.new_context(record_video_dir=video_dir)
        page = context.new_page()

        page.goto(url)
        page.wait_for_timeout(2000)

        if name == "basic":
            page.get_by_text("15", exact=True).first.click()
            page.wait_for_timeout(500)
            page.get_by_text("20", exact=True).first.click()
            page.wait_for_timeout(500)
        elif name == "range":
            page.get_by_text("10", exact=True).first.click()
            page.wait_for_timeout(500)
            page.get_by_text("25", exact=True).first.click()
            page.wait_for_timeout(500)
        elif name == "multiple":
            page.get_by_text("5", exact=True).first.click()
            page.wait_for_timeout(500)
            page.get_by_text("11", exact=True).first.click() # 10 is disabled
            page.wait_for_timeout(500)
            page.get_by_text("15", exact=True).first.click()
            page.wait_for_timeout(500)
        elif name == "headless":
            page.get_by_text("Next", exact=True).first.click()
            page.wait_for_timeout(500)
            page.get_by_text("15", exact=True).first.click()
            page.wait_for_timeout(500)
        elif name == "styling":
            page.get_by_text("10", exact=True).first.click()
            page.wait_for_timeout(500)

        page.wait_for_timeout(1000)
        context.close()
        browser.close()

        recorded_files = os.listdir(video_dir)
        if recorded_files:
            video_file = os.path.join(video_dir, sorted(recorded_files)[-1])
            dest_path = f"docs/videos/{name}.webm"
            os.makedirs("docs/videos", exist_ok=True)
            shutil.move(video_file, dest_path)
            print(f"Recorded {name} to {dest_path}")
        shutil.rmtree(video_dir)

if __name__ == "__main__":
    base_url = "http://localhost:3000"
    recipes = [
        ("/basic", "basic"),
        ("/range", "range"),
        ("/multiple", "multiple"),
        ("/headless", "headless"),
        ("/styling", "styling"),
    ]
    for path, name in recipes:
        record_video(base_url + path, name)
