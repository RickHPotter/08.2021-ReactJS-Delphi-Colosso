program backend;

{$APPTYPE CONSOLE}

{$R *.res}

uses Horse, Horse.BasicAuthentication, System.SysUtils;

begin
  THorse.Use(HorseBasicAuthentication(
    function(const AUsername, APassword: string): Boolean
    begin
      Result := AUsername.Equals('colosso@seTe.com') and APassword.Equals('$eTe123641');
    end));

  THorse.Get('/ping',
    procedure(Req: THorseRequest; Res: THorseResponse; Next: TProc)
    begin
      Res.Send('pong');
    end);

  THorse.Listen(9000);
end.
