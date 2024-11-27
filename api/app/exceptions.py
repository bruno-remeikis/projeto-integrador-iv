class InvalidFileExtensionError(Exception):
    def __init__(self, filename, extension):
        self.filename = filename
        self.extension = extension
        super().__init__(f'Invalid extension "{extension}" in file "{filename}"')
        
class InvalidTestTypeError(Exception):
    def __init__(self, testType: str):
        self.testType = testType
        super().__init__(f'Invalid test type "{testType}"')
