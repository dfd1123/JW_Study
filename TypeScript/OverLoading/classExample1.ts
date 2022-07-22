class ExportLibraryModal {
    public openComponentsToLibrary(libraryId: string, componentIds: string[]): void;
    public openComponentsToLibrary(componentIds: string[]): void;
    public openComponentsToLibrary(libraryIdOrComponentIds: string | string[], componentIds?: string[]) : void{
        if(typeof libraryIdOrComponentIds === 'string'){
            if(componentIds !== undefined){
                libraryIdOrComponentIds;
                componentIds;
            }
        }

        if(componentIds === undefined){
            libraryIdOrComponentIds;
        }
    }
}

const modal = new ExportLibraryModal();

modal.openComponentsToLibrary('id', ['compoid-1', 'compoid-2']);