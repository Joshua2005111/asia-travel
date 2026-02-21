# Asia Travel - App Icon Generator

from PIL import Image, ImageDraw
import os

def create_icon():
    ORANGE = "#FF6B35"
    WHITE = "#FFFFFF"
    
    base_size = 1024
    icon = Image.new('RGB', (base_size, base_size), ORANGE)
    draw = ImageDraw.Draw(icon)
    
    # Rounded rectangle background
    margin = 100
    draw.rounded_rectangle(
        [margin, margin, base_size-margin, base_size-margin], 
        radius=200, 
        fill=ORANGE
    )
    
    # White circle
    center_x, center_y = base_size // 2, base_size // 2
    circle_radius = 400
    draw.ellipse(
        [center_x - circle_radius, center_y - circle_radius,
         center_x + circle_radius, center_y + circle_radius],
        fill=WHITE
    )
    
    # Plane icon
    plane_size = 300
    plane_x = center_x
    plane_y = center_y
    
    plane_path = [
        (plane_x - 100, plane_y),
        (plane_x + 50, plane_y),
        (plane_x - 50, plane_y - 40),
        (plane_x - 30, plane_y),
        (plane_x - 50, plane_y + 40),
    ]
    
    draw.polygon(plane_path, fill=ORANGE)
    
    # Location marker
    marker_radius = 60
    draw.ellipse(
        [center_x - marker_radius, center_y - marker_radius,
         center_x + marker_radius, center_y + marker_radius],
        fill=ORANGE
    )
    draw.ellipse(
        [center_x - 25, center_y - 25,
         center_x + 25, center_y + 25],
        fill=WHITE
    )
    
    return icon

def main():
    print("[ICON] Generating Asia Travel App Icons...\n")
    
    base_icon = create_icon()
    
    sizes = {
        'ios_icon_20x20': (20, 20),
        'ios_icon_29x29': (29, 29),
        'ios_icon_40x40': (40, 40),
        'ios_icon_60x60': (60, 60),
        'ios_icon_76x76': (76, 76),
        'ios_icon_83.5x83.5': (84, 84),
        'ios_icon_1024x1024': (1024, 1024),
        'android_icon_36x36': (36, 36),
        'android_icon_48x48': (48, 48),
        'android_icon_72x72': (72, 72),
        'android_icon_96x96': (96, 96),
        'android_icon_144x144': (144, 144),
        'android_icon_192x192': (192, 192),
        'android_icon_512x512': (512, 512),
    }
    
    output_dir = 'assets/icons'
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"[DIR] Output: {output_dir}\n")
    
    for name, size in sizes.items():
        resized = base_icon.resize(size, Image.Resampling.LANCZOS)
        filename = f"{output_dir}/{name}.png"
        resized.save(filename, 'PNG')
        print(f"[OK] {name}: {size[0]}x{size[1]}")
    
    print(f"\n[OK] Total: {len(sizes)} icons generated")
    print(f"[DIR] Location: {output_dir}/")

if __name__ == '__main__':
    main()
