// Component that will host all children components
class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      // initial stock data
      portfolio: [
        {
          name: 'Facebook',
          shares_owned: 25,
          cost_per_share: 75,
          market_price: 150
        },
        {
          name: 'Amazon',
          shares_owned: 10,
          cost_per_share: 200,
          market_price: 500
        },
        {
          name: 'Twitter',
          shares_owned: 100,
          cost_per_share: 20,
          market_price: 5
        }
      ],
      // form state for adding new stocks
      form: {
        name: '',
        shares_owned: 0,
        cost_per_share: 0,
        market_price: 0
      }
    };
    
    // bind functions to this component
    this.removeStock = this.removeStock.bind(this);
    this.addStock = this.addStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  // remove a stock from the portfolio
  removeStock(index) {
    const portfolio = this.state.portfolio.slice(); //shallow copy
    portfolio.splice(index, 1); // remove value at index

    this.setState({portfolio});
  }
  
  // handle onChange event for portfolio
  handleChange(event, index) {
    const portfolio = this.state.portfolio.slice();
    const { name, value } = event.target;

    portfolio[index][name] = value;
    this.setState({portfolio});
  }

  // handle onChange event for form
  handleFormChange(event) {
    const { name, value } = event.target;
    const { form } = this.state;

    form[name] = value;
    this.setState({ form });
  }

  // add stock to portfolio
  addStock(event) {
    event.preventDefault();
    const portfolio = this.state.portfolio.slice();

    portfolio.push(this.state.form);

    // reset form to empty
    this.setState({
      portfolio,
      form: {
        name: '',
        shares_owned: 0,
        cost_per_share: 0,
        market_price: 0
      }
    })
  }

  render() {
    const {portfolio, form} = this.state;

    // calculate portfolio market value and total gain/loss
    const portfolio_market_value = portfolio.reduce((sum, stock) => stock.shares_owned * stock.market_price + sum, 0);
    const portfolio_cost = portfolio.reduce((sum, stock) => stock.shares_owned * stock.cost_per_share + sum, 0);
    const portfolio_gain_loss = portfolio_market_value - portfolio_cost;

    return (
      <div className='container'>
        <h1 className='text-center my-4'>Stock Portfolio</h1>
        <div className='row'>
          <div className='col-12'>
            <table className='table table-responsive'>
              <thead>
                <tr>
                  <th scope='col'>Name</th>
                  <th scope='col'>Shares Owned</th>
                  <th scope='col'>Cost per share ($)</th>
                  <th scope='col'>Market Price ($)</th>
                  <th scope='col'>Market Value ($)</th>
                  <th scope='col'>Unrealized Gain/Loss ($)</th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {
                  // render portfolio data in web page
                  portfolio.map((stock, index) => {
                    const {
                      name,
                      shares_owned,
                      cost_per_share,
                      market_price
                    } = stock;

                    // calculate market value and unrealized gain/loss
                    const market_value = shares_owned * market_price;
                    const unrealized_gain_loss = market_value - shares_owned * cost_per_share;
                    
                    // JSX for new stock 
                    return (
                      <tr key={index}>
                        <td>{name}</td>
                        <td>
                          <input type='number' name='shares_owned' value={shares_owned} onChange={e => this.handleChange(e, index)}/>
                        </td>
                        <td>
                          <input type='number' name='cost_per_share' value={cost_per_share} onChange={e => this.handleChange(e, index)}/>
                        </td>
                        <td>
                          <input type='number' name='market_price' value={market_price} onChange={e => this.handleChange(e, index)}/>
                        </td>
                        <td>{market_value}</td>
                        <td>{unrealized_gain_loss}</td>
                        <td>
                          <button className='btn btn-light btn-sm' onClick={() => this.removeStock(index)}>remove</button>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
          <form className="col-12 mt-2 mb-4" onSubmit={this.addStock}>
            <input 
            className="mx-2"
            name="name"
            type="text"
            placeholder ="Name"
            onChange={this.handleFormChange}
            value={form.name}
            required
            />
            <input 
            className="mx-2"
            name="shares_owned"
            type="number"
            placeholder ="Shares"
            onChange={this.handleFormChange}
            value={form.shares_owned}
            />
            <input 
            className="mx-2"
            name="cost_per_share"
            type="number"
            placeholder ="Cost"
            onChange={this.handleFormChange}
            value={form.cost_per_share}
            />
            <input 
            className="mx-2"
            name="market_price"
            type="number"
            placeholder ="Price"
            onChange={this.handleFormChange}
            value={form.market_price}
            />
            <button className="btn btn-primary btn-sm">add</button>
          </form>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">Portfolio value: $ {portfolio_market_value}</h4>
          </div>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">Portfolio gain/loss: $ {portfolio_gain_loss}</h4>
          </div>
        </div>
      </div>
    );
  }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Portfolio />);


// https://repl.it/@altcademy/React-Development-Build-a-stock-portfolio