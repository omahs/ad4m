rm -rf src-tauri/bins
mkdir src-tauri/bins

Copy-Item ../host/dist/ad4m-windows-x64.exe -Destination src-tauri/bins/ad4m-host-x86_64-pc-windows-gnu.exe
Copy-Item ../host/dist/ad4m-windows-x64.exe -Destination src-tauri/bins/ad4m-host-x86_64-pc-windows-msvc.exe