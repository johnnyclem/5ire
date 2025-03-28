!macro customInstall
  DeleteRegKey HKCR "appSouls"
  WriteRegStr HKCR "appSouls" "" "URL:appSouls"
  WriteRegStr HKCR "appSouls" "URL Protocol" ""
  WriteRegStr HKCR "appSouls\shell" "" ""
  WriteRegStr HKCR "appSouls\shell\Open" "" ""
  WriteRegStr HKCR "appSouls\shell\Open\command" "" "$INSTDIR\{APP_EXECUTABLE_FILENAME} %1"
!macroend

!macro customUnInstall
  DeleteRegKey HKCR "appSouls"
!macroend

# Fix Can not find Squairrel error
# https://github.com/electron-userland/electron-builder/issues/837#issuecomment-355698368
!macro customInit
  nsExec::Exec '"$LOCALAPPDATA\Souls\Update.exe" --uninstall -s'
!macroend
