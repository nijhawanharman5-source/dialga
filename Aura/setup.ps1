# Aura AI Installation Script
# This script handles the installation and setup of Aura AI application

param(
    [switch]$Force,
    [switch]$CleanInstall
)

# Error handling
$ErrorActionPreference = "Stop"

# Configuration
$AppName = "Aura AI"
$AppVersion = "2.0.0"
$InstallDir = "$env:LOCALAPPDATA\Aura AI"
$TempDir = "$env:TEMP\AuraSetup"
$InstallerUrl = "https://github.com/aura-ai/aura-desktop/releases/latest/download/Aura-Setup-2.0.0.exe"
$InstallerPath = "$TempDir\Aura-Setup-2.0.0.exe"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Aura AI Installation Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check for administrator privileges if needed
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if ($isAdmin) {
    Write-Host "Running with Administrator privileges" -ForegroundColor Yellow
} else {
    Write-Host "Running with user privileges" -ForegroundColor Green
}

# Function to cleanup old installations
function Remove-OldInstallations {
    Write-Host "Checking for old installations..." -ForegroundColor Yellow
    
    $oldPaths = @(
        "$env:LOCALAPPDATA\Aura AI",
        "$env:APPDATA\Aura AI",
        "$env:PROGRAMFILES\Aura AI",
        "$env:PROGRAMFILES(X86)\Aura AI"
    )
    
    foreach ($path in $oldPaths) {
        if (Test-Path $path) {
            Write-Host "Found old installation at: $path" -ForegroundColor Red
            if ($Force -or $CleanInstall) {
                Write-Host "Removing old installation..." -ForegroundColor Yellow
                try {
                    Remove-Item $path -Recurse -Force
                    Write-Host "Successfully removed: $path" -ForegroundColor Green
                } catch {
                    Write-Host "Failed to remove $path : $_" -ForegroundColor Red
                }
            } else {
                Write-Host "Use -Force or -CleanInstall to remove old installations" -ForegroundColor Yellow
            }
        }
    }
}

# Function to cleanup temporary files
function Remove-TemporaryFiles {
    Write-Host "Cleaning up temporary files..." -ForegroundColor Yellow
    if (Test-Path $TempDir) {
        Remove-Item $TempDir -Recurse -Force
        Write-Host "Temporary files cleaned" -ForegroundColor Green
    }
}

# Function to download installer
function Download-Installer {
    Write-Host "Downloading Aura AI installer..." -ForegroundColor Yellow
    
    # Create temp directory
    if (-not (Test-Path $TempDir)) {
        New-Item -ItemType Directory -Path $TempDir -Force | Out-Null
    }
    
    # Download installer
    try {
        Invoke-WebRequest -Uri $InstallerUrl -OutFile $InstallerPath -UseBasicParsing
        Write-Host "Download completed successfully" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "Download failed: $_" -ForegroundColor Red
        Write-Host "Attempting to use local installer..." -ForegroundColor Yellow
        
        # Check for local installer in release folder
        $localInstaller = "release\Aura-Setup-2.0.0.exe"
        if (Test-Path $localInstaller) {
            Copy-Item $localInstaller $InstallerPath -Force
            Write-Host "Using local installer" -ForegroundColor Green
            return $true
        }
        
        return $false
    }
}

# Function to run installer
function Install-Application {
    Write-Host "Starting installation..." -ForegroundColor Yellow
    
    try {
        # Run the installer silently
        $process = Start-Process -FilePath $InstallerPath -ArgumentList "/S" -Wait -PassThru
        
        if ($process.ExitCode -eq 0) {
            Write-Host "Installation completed successfully!" -ForegroundColor Green
            return $true
        } else {
            Write-Host "Installation failed with exit code: $($process.ExitCode)" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "Installation failed: $_" -ForegroundColor Red
        return $false
    }
}

# Function to create desktop shortcut
function Create-Shortcut {
    Write-Host "Creating desktop shortcut..." -ForegroundColor Yellow
    
    $desktopPath = [Environment]::GetFolderPath("Desktop")
    $shortcutPath = "$desktopPath\Aura AI.lnk"
    
    # Find the installed executable
    $possiblePaths = @(
        "$InstallDir\Aura.exe",
        "$env:PROGRAMFILES\Aura AI\Aura.exe",
        "$env:PROGRAMFILES(X86)\Aura AI\Aura.exe"
    )
    
    $exePath = $null
    foreach ($path in $possiblePaths) {
        if (Test-Path $path) {
            $exePath = $path
            break
        }
    }
    
    if ($exePath) {
        try {
            $WScriptShell = New-Object -ComObject WScript.Shell
            $shortcut = $WScriptShell.CreateShortcut($shortcutPath)
            $shortcut.TargetPath = $exePath
            $shortcut.Description = "Aura AI - Your Intelligence, Amplified"
            $shortcut.Save()
            Write-Host "Desktop shortcut created" -ForegroundColor Green
        } catch {
            Write-Host "Failed to create shortcut: $_" -ForegroundColor Red
        }
    } else {
        Write-Host "Could not find Aura.exe to create shortcut" -ForegroundColor Yellow
    }
}

# Main installation process
try {
    # Cleanup old installations if requested
    if ($CleanInstall) {
        Remove-OldInstallations
    }
    
    # Download installer
    if (-not (Download-Installer)) {
        Write-Host "Failed to download installer. Aborting." -ForegroundColor Red
        exit 1
    }
    
    # Run installation
    if (Install-Application) {
        # Create shortcut
        Create-Shortcut
        
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "  Installation Complete!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Aura AI has been successfully installed." -ForegroundColor Green
        Write-Host "You can now run it from the Start menu or desktop shortcut." -ForegroundColor Green
    } else {
        Write-Host "Installation failed. Please check the error messages above." -ForegroundColor Red
        exit 1
    }
    
} finally {
    # Cleanup temporary files
    Remove-TemporaryFiles
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
