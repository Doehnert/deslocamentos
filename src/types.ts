export interface Client {
  id?: number
  numeroDocumento?: string
  tipoDocumento?: string
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

export interface Conductor {
  id?: number
  nome?: string
  numeroHabilitacao?: string
  catergoriaHabilitacao: string
  vencimentoHabilitacao: string | null
}

export interface Vehicle {
  id?: number
  placa?: string
  marcaModelo: string
  anoFabricacao: number
  kmAtual: number
}

export interface Displacement {
  id?: number
  kmInicial: number
  kmFinal: number | null
  inicioDeslocamento: string
  fimDeslocamento: string | null
  checkList: string
  motivo: string
  observacao: string
  idCondutor: number
  idVeiculo: number
  idCliente: number
}

export interface FinishDisplacement {
  id: number
  kmFinal: number
  fimDeslocamento: string
  observacao: string
}

export interface State {
  id: number
  nome: string
}

export interface City {
  id: number
  nome: string
}
