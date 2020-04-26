import * as PDF from 'jspdf'
import { getNewDateTime24Hours, extractTimeOfDateTime, formatDateBR } from '../../utils/index'

export default class ReportGenerator {
  constructor() {
    this.doc = new PDF({ format: 'a4' })
    this.logo = null
    this.title = null
    this.dataset = []
    this.filters = []

    this.linePosition = 20
    this.numberPages = 1
  }

  set setLogo(value) {
    this.logo = value
  }

  set setTitle(value) {
    this.title = value
  }

  get getTitle() {
    return this.title
  }

  set setDataset(value) {
    this.dataset = value
  }

  set setFilters(value) {
    this.filters = value
  }

  configPages(doc) {
    let sizeDataset = 0

    for (const line of this.dataset) {
      sizeDataset += line.points.length
    }

    const pages = Math.ceil(sizeDataset * 3 / 36)

    if (pages > 1) {
      this.numberPages = pages
    }

    for (let i = 1; i < this.numberPages; i += 1) { // Criando a quantidade de paginas de acordo com o dataset
      doc.addPage()
    }

    doc.setPage(1)
  }

  mountHead(doc) {
    doc.setFontSize(16)
    doc.setFont('times')
    doc.text(20, 17, this.title)
    doc.line(20, 40, 200, 40)
    doc.addImage(this.logo, 'png', 160, 8, 40, 20)
    this.mountFilters(doc)
  }

  mountFilters(doc) {
    doc.setFontSize(12)
    this.linePosition = 20
    this.filters.forEach((filter) => {
      this.linePosition += 6
      doc.setFontType('bold')
      doc.text(20, this.linePosition, `${filter.name}:`)

      doc.setFontType('normal')
      doc.text(38, this.linePosition, filter.value.toString())
    })
  }

  mountFooter(doc) {
    const date = getNewDateTime24Hours()

    for (let i = 0; i < this.numberPages; i += 1) { // Criando as colunas em cada pagina
      const label = `Página ${i + 1} de ${this.numberPages}`
      doc.setPage(i + 1)
      doc.text(160, 280, date)
      doc.text(172, 286, label)
    }
  }

  jumpLine() {
    this.linePosition += 6
  }

  setLabelColumns(doc) {
    doc.setFontType('normal')
    doc.text(30, this.linePosition, 'Ponto 1')
    doc.text(50, this.linePosition, 'Ponto 2')
    doc.text(70, this.linePosition, 'Ponto 3')
    doc.text(90, this.linePosition, 'Ponto 4')
    doc.text(112, this.linePosition, 'Total dia')
    doc.text(137, this.linePosition, 'Hora extra')
    doc.text(165, this.linePosition, 'Pendência')
  }

  setValueColumns(doc, point) {
    doc.setFontType('normal')
    doc.text(30, this.linePosition, point.first_point ? extractTimeOfDateTime(point.first_point) : '--')
    doc.text(50, this.linePosition, point.second_point ? extractTimeOfDateTime(point.second_point) : '--')
    doc.text(70, this.linePosition, point.third_point ? extractTimeOfDateTime(point.third_point) : '--')
    doc.text(90, this.linePosition, point.fourth_point ? extractTimeOfDateTime(point.fourth_point) : '--')
    doc.text(112, this.linePosition, point.total_day || '--')
    doc.text(137, this.linePosition, point.extra_hour || '--')
    doc.text(165, this.linePosition, point.pendency || '--')
  }

  setGroup(doc, line) {
    doc.setFontType('bold')
    doc.text(20, this.linePosition, line.name)
  }

  mountBody(doc) {
    let actualPage = 1
    let count = 1
    this.linePosition = 50

    doc.setPage(actualPage)
    for (const line of this.dataset) { // Preenchendo o relatorio com o agrupamento de cada usuario
      this.setGroup(doc, line)
      this.jumpLine()
      for (const point of line.points) {
        if (count === 13) {
          count = 1
          actualPage += 1
          doc.setPage(actualPage)
          this.mountHead(doc)
          this.linePosition = 50
        }
        doc.setFontType('bold')
        doc.text(25, this.linePosition, `${formatDateBR(point.dia)}  -  ${point.diaSemana}`)
        this.jumpLine()
        this.setLabelColumns(doc)
        this.jumpLine()
        this.setValueColumns(doc, point)
        this.jumpLine()

        count += 1
      }
    }
  }

  export(reportName) {
    this.configPages(this.doc)
    this.mountHead(this.doc)
    this.mountFooter(this.doc)
    this.mountBody(this.doc)
    this.doc.save(reportName)
  }
}
