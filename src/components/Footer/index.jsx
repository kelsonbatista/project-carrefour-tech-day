import payment from "../../assets/images/payment.png";
import social from "../../assets/images/social.png";
import support from "../../assets/images/suporte2.png";
import "./styles.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer__support" />
      <div className="footer__navbar">
        <ul>
          <li>Atendimento</li>
          <li>Minha conta</li>
          <li>Meus pedidos</li>
          <li>Encontre uma loja</li>
          <li>Central de Atendimento</li>
          <li>Cartão Carrefour</li>
          <li>Perguntas frequentes</li>
          <li>Denunciar Produtos Martketplace</li>
        </ul>
        <ul>
          <li>Serviços</li>
          <li>Minhas listas</li>
          <li>Garantia Estendida</li>
          <li>Marketplace</li>
          <li>Apoio ao seller</li>
          <li>Institucional</li>
          <li>Perguntas frequentes</li>
        </ul>
        <ul>
          <li>Institucional</li>
          <li>Grupo Carrefour</li>
          <li>Trabalhe conosco</li>
          <li>Diversidade</li>
          <li>CyberCook</li>
          <li>Blog Dica Amiga</li>
          <li>Mapa de Produtos</li>
        </ul>
        <ul>
          <li>Políticas Carrefour</li>
          <li>Política de entregas</li>
          <li>Carrefour Te Protege</li>
          <li>Política de Trocas e Devoluções</li>
          <li>Política de instalação de pneus</li>
          <li>Termos de Uso</li>
          <li>Central de Privacidade</li>
        </ul>
        <ul>
          <li>Tire suas dúvidas ou compre pelo telefone:</li>
          <li>
            <p>Para regiões metropolitanas:</p>
            <p>3004-2222</p>
          </li>
          <li>
            <p>Para demais regiões:</p>
            <p>0800-718-2222</p>
          </li>
          <li>
            <p>Horário de atendimento:</p>
            <p>De segunda a domingo, das 08h às 21h</p>
            <p>Horário de Brasília</p>
          </li>
        </ul>
      </div>
      <div className="footer__payment">
        <div>
          <p>Formas de pagamento:</p>
          <img src={payment} alt="Payment" />
        </div>
        <div>
          <p>Siga-nos nas redes sociais:</p>
          <img src={social} alt="Social" />
        </div>
      </div>
      <div className="footer__small">
        <img className="footer__support2" src={support} alt="Support" />
        <div className="footer__phone">
          <p>Tire suas dúvidas ou compre pelo telefone:</p>
          <div>
            <div>
              <p>Para regiões metropolitanas:</p>
              <p>3004-2222</p>
            </div>
            <div>
              <p>Para demais regiões:</p>
              <p>0800-718-2222</p>
            </div>
          </div>
        </div>
        <img className="footer__social" src={social} alt="Social" />
        <div>
          <div className="footer__hours">
            <p>Horário de atendimento:</p>
            <p>De segunda a domingo, das 08h às 21h</p>
            <p>Horário de Brasília</p>
          </div>
        </div>
      </div>
      <div className="footer__address">
        <p>
          Carrefour Comércio e Indústrias Ltda: Via de Acesso Norte, Km 38, nº
          420, Empresarial Gato Preto, Cajamar - SP | CEP 07789-100 | CNPJ:
          45.543.915/0846-95
        </p>
        <p>
          Envio de documentos administrativos e jurídicos: Rua George Eastman,
          nº 213 - Vila Tramontano, São Paulo, SP | CEP 05690-000
        </p>
        <p>atendimento@carrefour.com.br</p>
      </div>
    </footer>
  );
};

export default Footer;
