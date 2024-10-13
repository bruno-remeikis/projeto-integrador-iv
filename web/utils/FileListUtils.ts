function transferFilesToDataTransfer(dt: DataTransfer, files: FileList | undefined) {
	if(files)
		for(let i = 0; i < files.length; i++)
			dt.items.add(files[i]);
}

export function concatFileList(...fileLists: (FileList | undefined)[]): FileList {
	const dt = new DataTransfer();
	for(const fileList of fileLists)
		transferFilesToDataTransfer(dt, fileList);
	return dt.files;
}