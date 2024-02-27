import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
//import Button from '../components/ButtonEditPaciente'
import { MRT_Localization_ES } from 'material-react-table/locales/es';

const TablaComponent = ({data, columns, ButtonsConfig, mutate}) => {
      const table = useMaterialReactTable({
        columns,
        data,//data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableRowActions: true,
        renderRowActions: ({row, table}) => {
          return (
            ButtonsConfig ? (<div className="flex flex-row"><ButtonsConfig row={row} mutate={mutate}/></div>)
             :(null)
          );
        },
        localization: MRT_Localization_ES,

      });
  return (
    <MaterialReactTable table={table} />
  )
}

export default TablaComponent