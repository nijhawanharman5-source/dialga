# Aura AI Cleanup Script
# This script removes old installations and temporary files

param(
    [switch]$Force,
    [switch]$All,
    [switch]$TempOnly
)

# Error handling
$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Aura AI Cleanup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check for administrator privileges
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "Warning: Not running as Administrator. Some cleanup may fail." -ForegroundColor Yellow
    Write-Host "Run as Administrator for complete cleanup." -ForegroundColor Yellow
    Write-Host ""
}

# Function to remove application files
function Remove-ApplicationFiles {
    Write-Host "Removing application files..." -ForegroundColor Yellow
    
    $appPaths = @(
        "$env:LOCALAPPDATA\Aura AI",
        "$env:APPDATA\Aura AI",
        "$env:PROGRAMFILES\Aura AI",
        "$env:PROGRAMFILES(X86)\Aura AI"
    )
    
    $removedCount = 0
    foreach ($path in $appPaths) {
        if (Test-Path $path) {
            Write-Host "Found: $path" -ForegroundColor Red
            if ($Force) {
                try {
                    Remove-Item $path -Recurse -Force
                    Write-Host "Removed: $path" -ForegroundColor Green
                    $removedCount++
                } catch {
                    Write-Host "Failed to remove $path : $_" -ForegroundColor Red
                    Write-Host "Try running as Administrator" -ForegroundColor Yellow
                }
            } else {
                Write-Host "Use -Force to remove: $path" -ForegroundColor Yellow
            }
        }
    }
    
    if ($removedCount -gt 0) {
        Write-Host "Removed $removedCount application directories" -ForegroundColor Green
    } else {
        Write-Host "No application files found or removed" -ForegroundColor Gray
    }
}

# Function to remove temporary files
function Remove-TemporaryFiles {
    Write-Host "Removing temporary files..." -ForegroundColor Yellow
    
    $tempPaths = @(
        "$env:TEMP\AuraSetup",
        "$env:TEMP\Aura*",
        "$env:TEMP\electron-builder*",
        "$env:TEMP\*aura*"
    )
    
    $removedCount = 0
    foreach ($pattern in $tempPaths) {
        $files = Get-Item $pattern -ErrorAction SilentlyContinue
        if ($files) {
            foreach ($file in $files) {
                Write-Host "Found: $($file.FullName)" -ForegroundColor Red
                try {
                    Remove-Item $file.FullName -Recurse -Force
                    Write-Host "Removed: $($file.FullName)" -ForegroundColor Green
                    $removedCount++
                } catch {
                    Write-Host "Failed to remove $($file.FullName) : $_" -ForegroundColor Red
                }
            }
        }
    }
    
    if ($removedCount -gt 0) {
        Write-Host "Removed $removedCount temporary files/directories" -ForegroundColor Green
    } else {
        Write-Host "No temporary files found" -ForegroundColor Gray
    }
}

# Function to remove registry entries
function Remove-RegistryEntries {
    Write-Host "Removing registry entries..." -ForegroundColor Yellow
    
    if (-not $isAdmin) {
        Write-Host "Skipping registry cleanup (requires Administrator)" -ForegroundColor Yellow
        return
    }
    
    $registryPaths = @(
        "HKCU:\Software\Aura AI",
        "HKLM:\Software\Aura AI",
        "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Aura AI",
        "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Aura AI"
    )
    
    $removedCount = 0
    foreach ($path in $registryPaths) {
        if (Test-Path $path) {
            Write-Host "Found: $path" -ForegroundColor Red
            if ($Force -or $All) {
                try {
                    Remove-Item $path -Recurse -Force
                    Write-Host "Removed: $path" -ForegroundColor Green
                    $removedCount++
                } catch {
                    Write-Host "Failed to remove $path : $_" -ForegroundColor Red
                }
            } else {
                Write-Host "Use -Force or -All to remove: $path" -ForegroundColor Yellow
            }
        }
    }
    
    if ($removedCount -gt 0) {
        Write-Host "Removed $removedCount registry entries" -ForegroundColor Green
    } else {
        Write-Host "No registry entries found or removed" -ForegroundColor Gray
    }
}

# Function to remove shortcuts
function Remove-Shortcuts {
    Write-Host "Removing shortcuts..." -ForegroundColor Yellow
    
    $shortcutPaths = @(
        "$([Environment]::GetFolderPath('Desktop'))\Aura AI.lnk",
        "$([Environment]::GetFolderPath('Desktop'))\Aura.lnk",
        "$([Environment]::GetFolderPath('StartMenu'))\Programs\Aura AI.lnk",
        "$([Environment]::GetFolderPath('CommonStartMenu'))\Programs\Aura AI.lnk"
    )
    
    $removedCount = 0
    foreach ($path in $shortcutPaths) {
        if (Test-Path $path) {
            Write-Host "Found: $path" -ForegroundColor Red
            try {
                Remove-Item $path -Force
                Write-Host "Removed: $path" -ForegroundColor Green
                $removedCount++
            } catch {
                Write-Host "Failed to remove $path : $_" -ForegroundColor Red
            }
        }
    }
    
    if ($removedCount -gt 0) {
        Write-Host "Removed $removedCount shortcuts" -ForegroundColor Green
    } else {
        Write-Host "No shortcuts found" -ForegroundColor Gray
    }
}

# Function to remove cache and data
function Remove-AppData {
    Write-Host "Removing application data..." -ForegroundColor Yellow
    
    $dataPaths = @(
        "$env:APPDATA\Aura AI",
        "$env:LOCALAPPDATA\Aura AI",
        "$env:USERPROFILE\.aura",
        "$env:USERPROFILE\.claude"
    )
    
    $removedCount = 0
    foreach ($path in $dataPaths) {
        if (Test-Path $path) {
            Write-Host "Found: $path" -ForegroundColor Red
            if ($All) {
                try {
                    Remove-Item $path -Recurse -Force
                    Write-Host "Removed: $path" -ForegroundColor Green
                    $removedCount++
                } catch {
                    Write-Host "Failed to remove $path : $_" -ForegroundColor Red
                }
            } else {
                Write-Host "Use -All to remove application data: $path" -ForegroundColor Yellow
            }
        }
    }
    
    if ($removedCount -gt 0) {
        Write-Host "Removed $removedCount data directories" -ForegroundColor Green
    } else {
        Write-Host "No application data found or removed" -ForegroundColor Gray
    }
}

# Main cleanup process
try {
    Write-Host "Starting cleanup process..." -ForegroundColor Yellow
    Write-Host ""
    
    # Always remove temporary files
    Remove-TemporaryFiles
    Write-Host ""
    
    # Remove shortcuts
    Remove-Shortcuts
    Write-Host ""
    
    # Remove application files
    if (-not $TempOnly) {
        Remove-ApplicationFiles
        Write-Host ""
        
        # Remove registry entries
        Remove-RegistryEntries
        Write-Host ""
        
        # Remove app data only if -All is specified
        if ($All) {
            Remove-AppData
            Write-Host ""
        }
    }
    
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  Cleanup Complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    if ($All) {
        Write-Host "All Aura AI files, data, and registry entries have been removed." -ForegroundColor Green
    } elseif ($TempOnly) {
        Write-Host "Temporary files have been cleaned." -ForegroundColor Green
    } else {
        Write-Host "Aura AI application files have been removed." -ForegroundColor Green
        Write-Host "Use -All to remove all data and registry entries." -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "Cleanup failed: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
