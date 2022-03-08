# eslint-config-hornet

Le module eslint-config-hornet inclue l'ensemble des règles eslint, typescript, sonar et prettier à respecter.  
Il est donc plus simple d'importer ces règles dans un projet en suivant la procédure ci-dessous.

```shell
npm install --save-dev eslint-config-hornet
```

Il faut ensuite ajouter un fichier ".eslintrc" à la racine du projet et importer la configuration "hornet" :

```javascript
{
    "extends": ["hornet"]
}

```

Il suffit ensuite de configurer le script qui permet de verifier que les règles sont bien respectées.

```json
"scripts": {
        "lint": "npx eslint --cache -c ./.eslintrc.js {src,test,stories,config}/**/*.{js,jsx,ts,tsx,json,md} . --output-file linter_report/eslint.json -f json",
        "lint-fix": "npx eslint -c ./.eslintrc.js --cache --fix",
        "lint-fix-all": "npx eslint --cache -c ./.eslintrc.js {src,test,stories,config}/**/*.{js,jsx,ts,tsx,json,md} . --fix",
},
```

## Intégration lint-staged pour des hooks git

Note : lint-staged a besoin d'un outil pour se configurer : `eslint` ou bien `prettier`, d'où l'installation du paquet en devDependencies. Ce paquet, par la suite, peut être supprimé car déjà importé par le module `eslint-config-hornet`.

```shell
npm install eslint --save-dev
npx mrm@2 lint-staged
```

Dans le package.json, ajouter la section script pour le lint et modifier la section dédié à lint-staged

```json
    "scripts": {
        "lint-fix": "npx eslint -c ./.eslintrc.js --cache --fix",
    }
    "lint-staged": {
        "*.ts": "npm run lint-fix"
    }
```

Supprimer les fichiers `.gitignore` présent dans le répertoire `.husky`, sinon le script ne sera jamais comité.
