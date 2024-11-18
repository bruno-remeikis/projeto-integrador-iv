import { useConfig } from "@/contexts/ConfigContext";
import { Modal, VisibilityModalProps } from "./Modal"
import { Switch } from "../simple/Switch";
import { Tooltip } from "../simple/Tooltip";
import { testTypes } from "@/models/TestType";
import { CiWarning } from "react-icons/ci";
import { IoIosWarning } from "react-icons/io";

export function ConfigModal({ visible, setVisible }: VisibilityModalProps) {

  const { config, setConfig } = useConfig();

  function close() {
    if (setVisible) {
      setVisible(false);
    }
  }

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      overlayClassName="relative p-6"
    >
      <h3 className="text-center">Configurações</h3>
      <div className="mt-3">
        <h4 className="mb-1">Tipo de Avaliação</h4>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(testTypes).map((testTypeKey, i) => <TestTypeCard key={i} testTypeKey={testTypeKey} />)}
        </div>
      </div>
      <div className="mt-3">
        <h4 className="mb-1">Campos</h4>
        <div className="flex flex-col gap-2">
          <Switch
            id='switch-nome'
            label="Nome do(s) aluno(s)"
            checked={config.name}
            setChecked={(value) => setConfig(prev => ({...prev, name: value}))}
          />
          <Switch
            id='switch-area-conhecimento'
            label="Área(s) de conhecimento"
            checked={config.area}
            setChecked={value => setConfig(prev => ({...prev, area: value}))}
          />
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center gap-2">
          <label htmlFor="area-prompt">Instrução adicional</label>
          <Tooltip type='warn' content="Suas instruções podem afetar a correção das provas e até impedir que as mesmas sejam corrigidas">
            <div>
              <IoIosWarning className="text-yellow-500" />
            </div>
          </Tooltip>
        </div>
        <textarea
          id='area-prompt'
          rows={4}
          cols={40}
          value={config.prompt}
          onChange={e => setConfig(prev => ({ ...prev, prompt: e.target.value }))}
        />
      </div>

      <div className="flex justify-end gap-2 mt-3">
        <button className="button flat-button" onClick={close}>Concluir</button>
      </div>
    </Modal>
  );
}



function TestTypeCard({ testTypeKey }: { testTypeKey: string }) {

  const { name, description, Icon, allowed } = testTypes[testTypeKey];

  const { config, selectTestType } = useConfig();

  const selected = config.testTypeKey === testTypeKey;

  return (
    <Tooltip content={allowed !== false ? description : null}>
      <div
        className={`flex flex-col items-center p-2 border rounded cursor-pointer ${allowed === false ? 'opacity-50 !cursor-default' : ( selected ? 'bg-blue-50 border-blue-500' : 'hover:bg-blue-50 hover:border-blue-500' )} transition-all`}
        onClick={() => {
          if (allowed !== false) {
            selectTestType(testTypeKey);
          }
        }}
      >
        <Icon />
        <span>{ name }</span>
      </div>
    </Tooltip>
  )
}