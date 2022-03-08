import { expect } from "chai";
import { ESLint } from "eslint";

function getErrors(fileToTest: string) {
    const cli = new ESLint();
    return cli.lintFiles(fileToTest);
}

describe("Validation configs ESLint", () => {
    /* eslint mocha/no-setup-in-describe:"off" */
    ["README.md", "src/index.ts", "src/rules/prettier.json", "test/config.spec.ts"].forEach((file) => {
        it(`chargement de la configuration ${file} dans ESLint pour valider que toutes les règles sont correctes`, async function testResult() {
            const result = await getErrors(file);
            expect(result[0]?.messages).to.have.length.lessThanOrEqual(0);
        });
    });
});
