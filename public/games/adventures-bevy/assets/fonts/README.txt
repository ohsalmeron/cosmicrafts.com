Place UI fonts here (paths relative to assets/). Restart game after adding or changing.

Default: fonts/OpenSans-Bold.ttf
- Use a bold .ttf for best readability. Override in assets/settings.ron under ui.font_path to try others (e.g. "fonts/SomeOtherBold.ttf").

SDF outlined title (main menu):
- To get an outlined title via bevy_sdf_text, generate an SDF atlas from your TTF using msdf-atlas-gen (https://github.com/Chlumsky/msdf-atlas-gen). Example (from repo root, with the tool installed):
  msdf-atlas-gen -font "assets/fonts/OpenSans-Bold.ttf" -type msdf -charset "ASCII" -imageout "assets/fonts/OpenSans-Bold.png" -jsonout "assets/fonts/OpenSans-Bold.json"
- Place the .png and .json in assets/fonts/. The main menu will use them for the title when the SDF draw path is enabled.
