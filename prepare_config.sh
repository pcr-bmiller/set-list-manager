currentBranch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
cp envConfig/index_$currentBranch.html.template public/index.html
cp envConfig/.env_$currentBranch .env