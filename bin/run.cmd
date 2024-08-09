@echo off
set filename=.\storage\credentials.txt

:loop
REM Get the size of the file
for %%A in ("%filename%") do set "size=%%~zA"

REM Check if the size is zero
if %size% equ 0 (
    goto :end
)

REM run rapid api token creation
pnpm run app


REM Repeat the loop
goto :loop

:end
echo End of processing.