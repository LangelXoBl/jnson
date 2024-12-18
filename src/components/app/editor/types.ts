export enum LANGUAGES {
   HTML = 'html',
   CSS = 'css',
   JS = 'javascript',
   shortJs = 'JS',
   json = 'json',
}

export enum STORAGE_NAMES {
   CODE = 'code',
}

export type PAYLOAD = {
   code: string;
   type: LANGUAGES;
};
