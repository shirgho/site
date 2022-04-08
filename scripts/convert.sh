FILES=../dev/md/*.md
for f in $FILES 
do 
    base_name=$(basename ${f}) 
    filename="${base_name%.*}"
    #echo "$f"
    echo "Converting $filename"
    `pandoc --standalone --template template_dev.html $f -o ../dev/out/$filename.html`
done

FILES=../writing/md/*.md
for f in $FILES 
do 
    base_name=$(basename ${f}) 
    filename="${base_name%.*}"
    #echo "$f"
    echo "Converting $filename"
    `pandoc --standalone --template template_writing.html $f -o ../writing/out/$filename.html`
done

FILES=../games/md/*.md
for f in $FILES 
do 
    base_name=$(basename ${f}) 
    filename="${base_name%.*}"
    #echo "$f"
    echo "Converting $filename"
    `pandoc --standalone --template template_games.html $f -o ../games/out/$filename.html`
done

FILES=../music/md/*.md
for f in $FILES 
do 
    base_name=$(basename ${f}) 
    filename="${base_name%.*}"
    #echo "$f"
    echo "Converting $filename"
    `pandoc --standalone --template template_music.html $f -o ../music/out/$filename.html`
done

