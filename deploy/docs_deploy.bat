REM DELETE EVERYTHING at C:\local_websites\furigana_docs\
del /s /q C:\local_websites\furigana_docs\*.*

REM XCOPY EVERYTHING to C:\local_websites\furigana_docs\
xcopy ..\docs C:\local_websites\furigana_docs\ /S /E /F