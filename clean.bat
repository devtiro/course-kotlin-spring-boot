@echo off
setlocal enabledelayedexpansion

for /D %%d in (*) do (
    if exist "%%d\bookstore" (
        echo Found bookstore in %%d
        cd "%%d\bookstore"
        call mvnw clean
        cd ..\..
    )
)

echo Script completed.