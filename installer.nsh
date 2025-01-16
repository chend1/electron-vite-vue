; 自定义安装路径
!macro preInit
        ReadRegStr $0 HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation
        ${if} $0 == ""
                StrCpy $INSTDIR "$PROGRAMFILES\notes_resume"
        ${Else}
                StrCpy $INSTDIR $0
        ${EndIf}
!macroend

!macro customInstall
        WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation $INSTDIR
        WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation $INSTDIR
!macroend