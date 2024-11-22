import { useConfig } from "@/contexts/ConfigContext";
import { Modal, VisibilityModalProps } from "./Modal"
import { Switch } from "../simple/Switch";
import { Tooltip } from "../simple/Tooltip";
import { testTypes } from "@/models/TestType";
import { IoIosWarning } from "react-icons/io";
import { Config, ConfigFromSwitch, TestType } from "@/models/Config";
import { useState } from "react";

export function ConfigModal({ visible, setVisible }: VisibilityModalProps) {

  const { config, setConfig } = useConfig();

  const [requireTheme, setRequireTheme] = useState<boolean>(false);

  function close() {
    if (setVisible) {
      if (config.testTypeKey === 'Essay' && !config.autoTheme && !config.theme.trim()) {
        setRequireTheme(true);
        alert('aaa');
        return;
      }

      setVisible(false);
    }
  }

  return (
    <Modal
      visible={visible}
      setVisible={close}
      overlayClassName="relative p-6"
    >
      <h3 className="text-center">Configurações</h3>
      
      <div className="mt-3">
        <h4 className="mb-1">Tipo de Avaliação</h4>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(testTypes).map((type: string, i: number) =>
            <TestTypeCard key={i} testTypeKey={type as TestType} />
          )}
        </div>
      </div>

      <div className="mt-3">
        <h4 className="mb-1">Campos</h4>
        <div className="flex flex-col gap-2">

          <ConfigSwitch field="name" label="Nome do(s) aluno(s)" />

          {config.testTypeKey === 'Discursive' &&
          <ConfigSwitch field="area" label="Área(s) de conhecimento" />}

          {config.testTypeKey === 'Essay' &&
          <>
            <ConfigSwitch field="autoTheme" label="Identificar tema da redação automaticamente" onChange={() => setRequireTheme(false)} />
            <div>
              <div>
                <label htmlFor="inp-theme" className="text-sm font-extralight">Tema</label>
                {!config.autoTheme &&
                <span className="text-red-500 font-bold"> *</span>}
              </div>
              <input
                id="inp-theme"
                className={requireTheme ? 'border-red-500 border-2' : ''}
                value={config.theme}
                onChange={e => setConfig(prev => ({ ...prev, theme: e.target.value }))}
                disabled={config.autoTheme}
              />
            </div>
          </>}

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



function TestTypeCard({ testTypeKey }: { testTypeKey: TestType }) {

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



type ConfigSwitchProps = {
  field: keyof ConfigFromSwitch;
  label: string;
  onChange?: Function;
}

function ConfigSwitch({ field, label, onChange }: ConfigSwitchProps) {

  const { config, setConfig } = useConfig();

  return (
    <Switch
      id={`switch-${field}`}
      label={label}
      checked={config[field]}
      setChecked={value => setConfig(prev => {
        if (onChange) {
          onChange();
        }
        return {...prev, [field]: value};
      })}
    />
  )
}