from abc import ABC, abstractmethod

class AiConnector(ABC):
    @abstractmethod
    def ask(self, question: str) -> str:
        pass