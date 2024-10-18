export class FileListUtils {
	private static transferFilesToDataTransfer(dt: DataTransfer, files: FileList | undefined) {
		if (!files)
			return;
		for (let i = 0; i < files.length; i++)
			dt.items.add(files[i]);
	}

	public static concat(...fileLists: (FileList | undefined)[]): FileList {
		const dt = new DataTransfer();
		for (const fileList of fileLists)
			FileListUtils.transferFilesToDataTransfer(dt, fileList);
		return dt.files;
	}

	public static remove(files: FileList, file: File): FileList {
		const dt = new DataTransfer();
		for (let i = 0; i < files.length; i++)
			if (files[i] !== file)
				dt.items.add(files[i]);
		return dt.files;
	}
}