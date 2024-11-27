from pydantic import BaseModel


class UploadConfig(BaseModel):
    testType: str
    name: bool = True
    area: bool = True
    prompt: str = ''
    theme: str = ''
    
#class EssayConfig(UploadConfig):
#    theme: str = ''