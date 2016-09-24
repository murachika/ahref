set x=%cd%
md build\chrome
cd chrome
"C:\Program Files\7-Zip\7z.exe" a -tzip "%x%.jar" * -r -mx=0 -x!*.svn
move "%x%.jar" ..\build\chrome
cd ..
copy install.* build
cd build
"C:\Program Files\7-Zip\7z.exe" a -tzip "%x%.xpi" * -r -mx=9 -x!*.svn
move "%x%.xpi" ..\
cd ..
rd build /s/q