REM DELETE EVERYTHING at C:\local_websites\furigana_docs\
del /s /q C:\local_websites\furigana_docs\*.*

REM COPY ..\src\furigana.js to C:\local_websites\furigana_docs\
copy ..\src\furigana.js C:\local_websites\furigana_docs\furigana.js

REM XCOPY EVERYTHING in ..\docs to C:\local_websites\furigana_docs\
xcopy ..\docs C:\local_websites\furigana_docs\ /S /E /F