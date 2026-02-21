# Generate simple app icons for Asia Travel

from PIL import Image, ImageDraw
import os

def create_simple_icon(size, filename):
    """创建简约图标"""
    ORANGE = "#FF6B35"
    WHITE = "#FFFFFF"
    
    img = Image.new('RGB', (size, size), ORANGE)
    draw = ImageDraw.Draw(img)
    
    # 白色圆形
    center = size // 2
    radius = size // 2 - 10
    draw.ellipse(
        [center - radius, center - radius, center + radius, center + radius],
        fill=WHITE
    )
    
    # 简单的飞机图标
    plane_size = size // 3
    plane_offset = 0
    
    plane_path = [
        (center - plane_size//2 + plane_offset, center),
        (center + plane_size//2 + plane_offset, center),
        (center + plane_offset, center - plane_size//3),
        (center + plane_offset, center),
        (center + plane_offset, center + plane_size//3),
    ]
    
    draw.polygon(plane_path, fill=ORANGE)
    
    # 保存
    img.save(filename, 'PNG')
    print(f"[OK] {filename}")

def main():
    print("[ICON] Generating Asia Travel Icons\n")
    
    # Android icons
    android_sizes = {
        'android/app/src/main/res/mipmap-hdpi/ic_launcher.png': 72,
        'android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png': 72,
        'android/app/src/main/res/mipmap-mdpi/ic_launcher.png': 48,
        'android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png': 48,
        'android/app/src/main/res/mipmap-xhdpi/ic_launcher.png': 96,
        'android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png': 96,
        'android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png': 144,
        'android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png': 144,
        'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png': 192,
        'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png': 192,
    }
    
    for path, size in android_sizes.items():
        os.makedirs(os.path.dirname(path), exist_ok=True)
        create_simple_icon(size, path)
    
    # Expo assets
    assets_sizes = [
        ('assets/icon.png', 512),
        ('assets/icon1024.png', 1024),
    ]
    
    for path, size in assets_sizes:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        create_simple_icon(size, path)
    
    print("\n[OK] All icons generated!")

if __name__ == '__main__':
    main()
