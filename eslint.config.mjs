import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import ts from "@typescript-eslint/eslint-plugin";

export default [
	// Basisregeln für alle JavaScript/TypeScript-Dateien
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2022,
			sourceType: "module",
		},
		plugins: {
			"@typescript-eslint": ts,
		},
		rules: {
			// JavaScript-Basisregeln
			"no-unused-vars": "off",
			"no-undef": "off",
			"no-console": "off",

			// TypeScript-spezifische Regeln
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
		},
	},

	// Ignorierte Dateien und Verzeichnisse
	{
		ignores: ["node_modules/**", ".next/**", "out/**", "dist/**"]
	}
];
