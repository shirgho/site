#FOLDERS = ../dev/md/*/
#for folder in $FOLDERS
#do
#    echo $folder
#    FILES = $folder/*.md
#    for f in $FILES
#    do 
#       echo $f
#    done
#done

$DIRS = find ../dev/md -name "*.md"
for folder in $DIRS
do
    echo $folder
    for file in $folder
    do 
        FILES = find $file -name "*.md"
        echo $FILES
    done 
done