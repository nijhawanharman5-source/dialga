; NSIS Installer Script for Aura AI
; Handles cleanup of old installers after successful installation
; Enhanced for full system access and old version cleanup

!macro customInit
  ; Request administrator privileges for full system access
  UserInfo::GetAccountType
  pop $0
  ${If} $0 != "admin" ; Require admin rights
    MessageBox MB_OK|MB_ICONSTOP "Aura AI requires administrator privileges for full system access. Please restart the installer as administrator."
    Quit
  ${EndIf}
  
  ; Delete old installer files on installation
  ${If} ${FileExists} "$INSTDIR\..\Aura Setup 1.0.0.exe"
    Delete "$INSTDIR\..\Aura Setup 1.0.0.exe"
  ${EndIf}
  
  ${If} ${FileExists} "$INSTDIR\..\Aura-Setup-1.0.0.exe"
    Delete "$INSTDIR\..\Aura-Setup-1.0.0.exe"
  ${EndIf}
  
  ; Search and delete any old setup files in release folder
  FindFirst $0 $1 "$INSTDIR\..\..\release\Aura Setup*.exe"
  aura_cleanup_loop:
    StrCmp $1 "" aura_cleanup_done
    Delete "$INSTDIR\..\..\release\$1"
    FindNext $0 $1
    Goto aura_cleanup_loop
  aura_cleanup_done:
  FindClose $0
  
  ; Search and delete any old setup files with Aura-Setup pattern
  FindFirst $0 $1 "$INSTDIR\..\..\release\Aura-Setup*.exe"
  aura_cleanup_loop2:
    StrCmp $1 "" aura_cleanup_done2
    Delete "$INSTDIR\..\..\release\$1"
    FindNext $0 $1
    Goto aura_cleanup_loop2
  aura_cleanup_done2:
  FindClose $0
!macroend

!macro customInstall
  ; Custom installation steps
  DetailPrint "Installing Aura AI with full system access..."
  
  ; Set registry keys for auto-start (optional)
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Run" "Aura AI" "$INSTDIR\Aura.exe"
  
  ; Create shortcuts with proper icons
  CreateShortcut "$DESKTOP\Aura.lnk" "$INSTDIR\Aura.exe" "" "$INSTDIR\Aura.exe" 0
  CreateShortcut "$SMPROGRAMS\Aura.lnk" "$INSTDIR\Aura.exe" "" "$INSTDIR\Aura.exe" 0
  CreateShortcut "$SMPROGRAMS\Startup\Aura.lnk" "$INSTDIR\Aura.exe" "" "$INSTDIR\Aura.exe" 0
  
  ; Add uninstall information to registry
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Aura AI" "DisplayName" "Aura AI"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Aura AI" "DisplayVersion" "2.0.0"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Aura AI" "Publisher" "Aura AI"
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Aura AI" "NoModify" 1
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Aura AI" "NoRepair" 1
  
  ; Set file permissions for full access
  ExecWait 'icacls "$INSTDIR" /grant Everyone:(OI)(CI)F /T'
!macroend

!macro customUnInit
  ; Cleanup on uninstall
  DetailPrint "Removing Aura AI..."
  
  ; Remove auto-start from registry
  DeleteRegValue HKLM "Software\Microsoft\Windows\CurrentVersion\Run" "Aura AI"
  
  ; Delete shortcuts
  Delete "$DESKTOP\Aura.lnk"
  Delete "$SMPROGRAMS\Aura.lnk"
  Delete "$SMPROGRAMS\Startup\Aura.lnk"
  
  ; Remove application data if user chooses
  MessageBox MB_YESNO "Do you want to remove all Aura AI data including settings, conversations, and memories?" IDNO skip_data_removal
    RMDir /r "$APPDATA\aura-ai"
    RMDir /r "$LOCALAPPDATA\aura-ai"
    RMDir /r "$APPDATA\Aura AI"
    RMDir /r "$LOCALAPPDATA\Aura AI"
    RMDir /r "$USERPROFILE\.aura"
    RMDir /r "$USERPROFILE\.claude"
  skip_data_removal:
  
  ; Remove registry entries
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Aura AI"
  DeleteRegKey HKLM "Software\Aura AI"
  DeleteRegKey HKCU "Software\Aura AI"
!macroend
