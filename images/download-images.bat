@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Downloading HD versions of the E.M.C photo album...

curl -L -s -o "hero-1.jpg" "https://images.unsplash.com/photo-1648881806148-e5c51179c826?auto=format&fit=crop&w=1920&q=80" && echo   hero-1.jpg
curl -L -s -o "hero-2.jpg" "https://images.unsplash.com/photo-1664711942326-2c3351e215e6?auto=format&fit=crop&w=1920&q=80" && echo   hero-2.jpg
curl -L -s -o "hero-3.jpg" "https://images.unsplash.com/photo-1605610973140-02080d1905ec?auto=format&fit=crop&w=1920&q=80" && echo   hero-3.jpg
curl -L -s -o "about-main.jpg" "https://images.unsplash.com/photo-1785535573662-417e82193598?auto=format&fit=crop&w=1400&q=80" && echo   about-main.jpg
curl -L -s -o "about-detail.jpg" "https://images.unsplash.com/photo-1684165610413-2401399e0e59?auto=format&fit=crop&w=1400&q=80" && echo   about-detail.jpg
curl -L -s -o "style-modern-warm.jpg" "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1400&q=80" && echo   style-modern-warm.jpg
curl -L -s -o "style-japandi.jpg" "https://images.unsplash.com/photo-1784315123205-34aa35249165?auto=format&fit=crop&w=1400&q=80" && echo   style-japandi.jpg
curl -L -s -o "style-neoclassic.jpg" "https://images.unsplash.com/photo-1593987314040-8e0ac84ae724?auto=format&fit=crop&w=1400&q=80" && echo   style-neoclassic.jpg
curl -L -s -o "work-01-reception.jpg" "https://images.unsplash.com/photo-1637412816281-f80ec9948fea?auto=format&fit=crop&w=1400&q=80" && echo   work-01-reception.jpg
curl -L -s -o "work-02-kitchen.jpg" "https://images.unsplash.com/photo-1512916194211-3f2b7f5f7de3?auto=format&fit=crop&w=1400&q=80" && echo   work-02-kitchen.jpg
curl -L -s -o "work-03-master-bedroom.jpg" "https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?auto=format&fit=crop&w=1400&q=80" && echo   work-03-master-bedroom.jpg
curl -L -s -o "work-04-bathroom.jpg" "https://images.unsplash.com/photo-1576698483491-8c43f0862543?auto=format&fit=crop&w=1400&q=80" && echo   work-04-bathroom.jpg
curl -L -s -o "work-05-lounge.jpg" "https://images.unsplash.com/photo-1684928365243-be7d3d9669a2?auto=format&fit=crop&w=1400&q=80" && echo   work-05-lounge.jpg
curl -L -s -o "work-06-clinic-reception.jpg" "https://images.unsplash.com/photo-1758448500688-3ababa93fd67?auto=format&fit=crop&w=1400&q=80" && echo   work-06-clinic-reception.jpg
curl -L -s -o "work-07-dressing-room.jpg" "https://images.unsplash.com/photo-1672137233327-37b0c1049e77?auto=format&fit=crop&w=1400&q=80" && echo   work-07-dressing-room.jpg
curl -L -s -o "work-08-bedroom.jpg" "https://images.unsplash.com/photo-1642541070065-3912f347e7c6?auto=format&fit=crop&w=1400&q=80" && echo   work-08-bedroom.jpg
curl -L -s -o "work-09-kitchen.jpg" "https://images.unsplash.com/photo-1622372738946-62e02505feb3?auto=format&fit=crop&w=1400&q=80" && echo   work-09-kitchen.jpg
curl -L -s -o "work-10-guest-bath.jpg" "https://images.unsplash.com/photo-1642755623069-eb720c326553?auto=format&fit=crop&w=1400&q=80" && echo   work-10-guest-bath.jpg
curl -L -s -o "after.jpg" "https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?auto=format&fit=crop&w=1400&q=80" && echo   after.jpg
curl -L -s -o "before.jpg" "https://images.unsplash.com/photo-1444419988131-046ed4e5ffd6?auto=format&fit=crop&w=1400&q=80" && echo   before.jpg
curl -L -s -o "testimonials-bg.jpg" "https://images.unsplash.com/photo-1642541070065-3912f347e7c6?auto=format&fit=crop&w=1920&q=80" && echo   testimonials-bg.jpg

echo.
echo Done! HD photos saved in the images folder.
pause
