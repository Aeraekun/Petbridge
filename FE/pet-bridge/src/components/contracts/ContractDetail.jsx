const ContractDetail = ({
  contractorNickname,
  contracteeNickname,
  animalName,
  month,
  payment,
  content,
}) => {
  return (
    <div className="flex flex-col space-y-5">
      <p className="bg-none px-2">
        <span>보호자 </span>
        <span className="text-point px-2 font-bold">{contractorNickname}</span>
        <span>님은 </span>
        <span>입양자 </span>
        <span className="text-point px-2 font-bold">{contracteeNickname}</span>
        <span>님과 입양 동물 </span>
        <span className="text-point px-2 font-bold">{animalName}</span>
        <span>에 대한 입양 계약을 다음과 같이 체결합니다.</span>
      </p>
      <p className="bg-none px-2">
        <span>입양자는 입양 계약 체결 후 </span>
        <span className="text-point px-2 font-bold">{month}</span>
        <span>
          개월동안 매월 펫픽 혹은 커뮤니티에 후기를 작성을 약속합니다.
        </span>
      </p>
      {content && (
        <>
          <p className="bg-none px-2 ">
            <span>아래 특약 사항을 성실히 이행합니다.</span>
          </p>
          <div className="rounded-lg border-2 border-black bg-none p-5">
            <p className="mb-5 text-center text-gray-500">특약 사항</p>
            <p className="text-point px-2 text-center font-bold">{content}</p>
          </div>
          <p className="bg-none px-2"></p>
        </>
      )}
      <p className="bg-none px-2">
        <span>
          위 사항을 성실히 이행했을 시, 보호자의 확인에 따라 계약 체결시
          견우와직묘에 저장된 책임비
        </span>
        <span className="text-point px-2 font-bold">{payment}</span>
        <span>원을 반환합니다.</span>
      </p>
      <p className="bg-none px-2">
        <span>
          만약 입양자가 계약 기간 내 계약 내용을 성실히 이행하지 않을 경우,
          관리자는 견우와직묘 사이트에서 임의로 선정한 공공기관에 책임비를
          기부할 수 있습니다.
        </span>
      </p>
      <p className="bg-none px-2">
        <span>
          이로 인해 발생하는 모든 책임은 입양자에게 있으며, 기부된 책임비는 절대
          보호자나 관리자의 사적인 용도로 사용되지 않습니다.
        </span>
      </p>
    </div>
  )
}

export default ContractDetail
